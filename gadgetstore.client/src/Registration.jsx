import React, { useEffect, useState } from "react";
import "./registration.css";

const CITIES = [
    "Астана", "Алматы", "Шымкент", "Караганда", "Актобе", "Костанай", "Павлодар",
    "Усть-Каменогорск", "Семей", "Тараз", "Кызылорда", "Атырау", "Актау",
    "Петропавловск", "Кокшетау", "Талдыкорган", "Туркестан"
];
const LEGAL_FORMS = ["ТОО", "АО", "Другая форма"];

const onlyDigits = (v, max) => v.replace(/\D/g, "").slice(0, max);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Field({ label, hint, error, children }) {
    return (
        <label className={`reg-field ${error ? "reg-field-error" : ""}`}>
            <span>{label}</span>
            {children}
            {error ? <small className="reg-error">{error}</small> : hint ? <small className="reg-hint">{hint}</small> : null}
        </label>
    );
}

function ChoiceCard({ icon, title, text, onClick }) {
    return (
        <button type="button" className="reg-choice" onClick={onClick}>
            <span className="reg-choice-icon">{icon}</span>
            <strong>{title}</strong>
            <p>{text}</p>
        </button>
    );
}

/** Окно регистрации: покупатель / продавец (личный магазин или компания) */
export default function Registration({ onClose, onComplete }) {
    // role | sellerType | form
    const [step, setStep] = useState("role");
    const [role, setRole] = useState("");
    const [sellerType, setSellerType] = useState("");
    const [errors, setErrors] = useState({});
    const [f, setF] = useState({
        name: "", email: "", phone: "", city: "Астана",
        shopName: "", shopDescription: "",
        iin: "",
        legalForm: "ТОО", legalName: "", bin: "", legalAddress: "", director: "",
        agree: false
    });

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const set = (key) => (e) => setF(prev => ({ ...prev, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
    const isSeller = role === "seller";
    const isCompany = isSeller && sellerType === "company";

    const title =
        step === "role" ? "Регистрация"
            : step === "sellerType" ? "Тип магазина"
                : !isSeller ? "Регистрация покупателя"
                    : isCompany ? "Регистрация компании" : "Регистрация личного магазина";

    function back() {
        setErrors({});
        if (step === "form") setStep(isSeller ? "sellerType" : "role");
        else if (step === "sellerType") setStep("role");
    }

    function validate() {
        const e = {};
        if (f.name.trim().length < 2) e.name = "Введите имя и фамилию";
        if (!emailOk(f.email.trim())) e.email = "Введите корректный email";
        if (onlyDigits(f.phone, 15).length < 10) e.phone = "Введите телефон полностью";
        if (isSeller) {
            if (!f.shopName.trim()) e.shopName = "Укажите название магазина";
            if (!isCompany && f.iin.length !== 12) e.iin = "ИИН состоит из 12 цифр";
            if (isCompany) {
                if (!f.legalName.trim()) e.legalName = "Укажите название компании";
                if (f.bin.length !== 12) e.bin = "БИН состоит из 12 цифр";
                if (!f.legalAddress.trim()) e.legalAddress = "Укажите юридический адрес";
                if (!f.director.trim()) e.director = "Укажите руководителя";
            }
            if (!f.agree) e.agree = "Нужно принять условия для продавцов";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function submit(ev) {
        ev.preventDefault();
        if (!validate()) return;
        const account = {
            role,
            name: f.name.trim(),
            email: f.email.trim(),
            phone: f.phone.trim(),
            city: f.city,
            createdAt: new Date().toLocaleDateString("ru-RU")
        };
        if (isSeller) {
            account.sellerType = sellerType; // "individual" | "company"
            account.shop = { name: f.shopName.trim(), description: f.shopDescription.trim() };
            if (isCompany) {
                account.company = {
                    legalForm: f.legalForm,
                    legalName: f.legalName.trim(),
                    bin: f.bin,
                    legalAddress: f.legalAddress.trim(),
                    director: f.director.trim()
                };
            } else {
                account.individual = { iin: f.iin };
            }
        }
        onComplete(account);
    }

    return (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <section className="modal modal-wide reg-modal" role="dialog" aria-modal="true" aria-label={title}>
                <div className="modal-heading">
                    <div><p className="eyebrow">NEXUSGEAR</p><h2>{title}</h2></div>
                    <button className="icon-button" onClick={onClose} aria-label="Закрыть">✕</button>
                </div>

                {step !== "role" && <button type="button" className="reg-back" onClick={back}>← Назад</button>}

                {step === "role" && (
                    <div className="reg-step">
                        <p className="reg-lead">Как вы хотите пользоваться NEXUSGEAR?</p>
                        <div className="reg-choices">
                            <ChoiceCard icon="🛒" title="Я покупатель" text="Покупайте игровую периферию, сохраняйте избранное и отслеживайте заказы."
                                onClick={() => { setRole("buyer"); setStep("form"); }} />
                            <ChoiceCard icon="🏪" title="Я продавец" text="Откройте свой магазин на площадке и продавайте устройства покупателям."
                                onClick={() => { setRole("seller"); setStep("sellerType"); }} />
                        </div>
                    </div>
                )}

                {step === "sellerType" && (
                    <div className="reg-step">
                        <p className="reg-lead">От чьего имени вы будете продавать?</p>
                        <div className="reg-choices">
                            <ChoiceCard icon="👤" title="Личный магазин" text="Вы продаёте как физическое лицо или ИП, один человек."
                                onClick={() => { setSellerType("individual"); setStep("form"); }} />
                            <ChoiceCard icon="🏢" title="Компания" text="Магазин открывает юридическое лицо: ТОО, АО или другая организация."
                                onClick={() => { setSellerType("company"); setStep("form"); }} />
                        </div>
                    </div>
                )}

                {step === "form" && (
                    <form className="reg-form" onSubmit={submit} noValidate>
                        {isSeller && (
                            <div className="reg-type-badge">
                                {isCompany ? "🏢 Компания" : "👤 Личный магазин"}
                            </div>
                        )}

                        {isSeller && (
                            <fieldset className="reg-group">
                                <legend>Магазин</legend>
                                <Field label="Название магазина" error={errors.shopName}>
                                    <input value={f.shopName} onChange={set("shopName")} maxLength={60} placeholder="Например, ProGear KZ" />
                                </Field>
                                <Field label="Описание" hint="Необязательно. Расскажите, что вы продаёте.">
                                    <textarea value={f.shopDescription} onChange={set("shopDescription")} maxLength={300} rows={3} />
                                </Field>
                            </fieldset>
                        )}

                        {isCompany && (
                            <fieldset className="reg-group">
                                <legend>Данные компании</legend>
                                <div className="reg-row">
                                    <Field label="Организационная форма">
                                        <select value={f.legalForm} onChange={set("legalForm")}>
                                            {LEGAL_FORMS.map(x => <option key={x}>{x}</option>)}
                                        </select>
                                    </Field>
                                    <Field label="Название компании" error={errors.legalName}>
                                        <input value={f.legalName} onChange={set("legalName")} maxLength={80} placeholder="Без кавычек и формы" />
                                    </Field>
                                </div>
                                <Field label="БИН" error={errors.bin} hint="12 цифр">
                                    <input inputMode="numeric" value={f.bin} onChange={(e) => setF(p => ({ ...p, bin: onlyDigits(e.target.value, 12) }))} placeholder="000000000000" />
                                </Field>
                                <Field label="Юридический адрес" error={errors.legalAddress}>
                                    <input value={f.legalAddress} onChange={set("legalAddress")} maxLength={120} placeholder="Город, улица, дом, офис" />
                                </Field>
                                <Field label="Руководитель (ФИО)" error={errors.director}>
                                    <input value={f.director} onChange={set("director")} maxLength={80} />
                                </Field>
                            </fieldset>
                        )}

                        {isSeller && !isCompany && (
                            <fieldset className="reg-group">
                                <legend>Данные продавца</legend>
                                <Field label="ИИН" error={errors.iin} hint="12 цифр. Нужен для проверки продавца.">
                                    <input inputMode="numeric" value={f.iin} onChange={(e) => setF(p => ({ ...p, iin: onlyDigits(e.target.value, 12) }))} placeholder="000000000000" />
                                </Field>
                            </fieldset>
                        )}

                        <fieldset className="reg-group">
                            <legend>{isCompany ? "Контактное лицо" : "Контакты"}</legend>
                            <Field label="Имя и фамилия" error={errors.name}>
                                <input value={f.name} onChange={set("name")} maxLength={80} placeholder="Как к вам обращаться" />
                            </Field>
                            <div className="reg-row">
                                <Field label="Email" error={errors.email}>
                                    <input type="email" value={f.email} onChange={set("email")} placeholder="name@example.com" />
                                </Field>
                                <Field label="Телефон" error={errors.phone}>
                                    <input value={f.phone} onChange={set("phone")} placeholder="+7 ___ ___ __ __" />
                                </Field>
                            </div>
                            <Field label="Город">
                                <select value={f.city} onChange={set("city")}>
                                    {CITIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </Field>
                        </fieldset>

                        {isSeller && (
                            <label className={`reg-check ${errors.agree ? "reg-field-error" : ""}`}>
                                <input type="checkbox" checked={f.agree} onChange={set("agree")} />
                                <span>Я принимаю условия для продавцов и подтверждаю, что данные указаны верно</span>
                                {errors.agree && <small className="reg-error">{errors.agree}</small>}
                            </label>
                        )}

                        <button className="primary-button full-button" type="submit">
                            {isSeller ? "Создать магазин" : "Зарегистрироваться"}
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
}

/** Карточка аккаунта для личного кабинета */
export function AccountSummary({ account, onRegister, onLogout }) {
    if (!account) {
        return (
            <div className="account-card reg-summary">
                <div>
                    <p className="eyebrow">АККАУНТ</p>
                    <h2>Вы ещё не зарегистрированы</h2>
                    <p>Зарегистрируйтесь как покупатель или откройте свой магазин как продавец.</p>
                </div>
                <button className="primary-button" onClick={onRegister}>Зарегистрироваться</button>
            </div>
        );
    }
    const isSeller = account.role === "seller";
    const isCompany = account.sellerType === "company";
    const roleLabel = !isSeller ? "Покупатель" : isCompany ? "Продавец · Компания" : "Продавец · Личный магазин";
    return (
        <div className="account-card reg-summary reg-summary-column">
            <div className="reg-summary-top">
                <div>
                    <p className="eyebrow">АККАУНТ</p>
                    <h2>{isSeller ? account.shop.name : account.name}</h2>
                </div>
                <span className={`reg-role ${isSeller ? "reg-role-seller" : ""}`}>{roleLabel}</span>
            </div>
            {isSeller && (
                <dl className="reg-details">
                    {isCompany ? (
                        <>
                            <div><dt>Компания</dt><dd>{account.company.legalForm} «{account.company.legalName}»</dd></div>
                            <div><dt>БИН</dt><dd>{account.company.bin}</dd></div>
                            <div><dt>Юр. адрес</dt><dd>{account.company.legalAddress}</dd></div>
                            <div><dt>Руководитель</dt><dd>{account.company.director}</dd></div>
                        </>
                    ) : (
                        <div><dt>ИИН</dt><dd>{account.individual.iin}</dd></div>
                    )}
                    <div><dt>Контакт</dt><dd>{account.name}, {account.phone}</dd></div>
                    {account.shop.description && <div><dt>О магазине</dt><dd>{account.shop.description}</dd></div>}
                </dl>
            )}
            <div className="reg-summary-foot">
                <small>Регистрация: {account.createdAt}</small>
                <button className="secondary-button" onClick={onLogout}>Выйти из аккаунта</button>
            </div>
        </div>
    );
}
