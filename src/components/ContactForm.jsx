import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import styles from './ContactForm.module.css'

// ─── Replace these with your real EmailJS credentials ───
const EMAILJS_SERVICE_ID = 'service_exi324q'
const EMAILJS_TEMPLATE_ID = 'template_v28i60t'
const EMAILJS_PUBLIC_KEY = '-bROCeNsyUO-DipCC'
// ────────────────────────────────────────────────────────

function useIsMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent)
    || window.matchMedia('(max-width: 768px)').matches
}

export default function ContactForm() {
  const { lang } = useLang()
  const txt = t[lang].contact.form
  const isMobile = useIsMobile()
  const formRef = useRef()

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [focused, setFocused] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!fields.name.trim()) e.name = true
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) e.email = true
    if (!fields.message.trim()) e.message = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    // On mobile → open mailto directly
    if (isMobile) {
      const subject = encodeURIComponent(fields.subject || 'Contact from portfolio')
      const body = encodeURIComponent(`Name: ${fields.name}\n\n${fields.message}`)
      window.location.href = `mailto:zouaoui.mohamedskander@gmail.com?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const reset = () => {
    setFields({ name: '', email: '', subject: '', message: '' })
    setStatus('idle')
    setErrors({})
  }

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M8.5 14l4 4 7-7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className={`${styles.successTitle} display`}>{txt.successTitle}</h3>
        <p className={styles.successMsg}>{txt.successMsg}</p>
        <button className={styles.anotherBtn} onClick={reset}>{txt.another}</button>
      </div>
    )
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        {/* Name */}
        <div className={`${styles.field} ${focused === 'name' ? styles.focused : ''} ${errors.name ? styles.fieldError : ''}`}>
          <label className={`${styles.label} mono`}>{txt.name}</label>
          <input
            name="from_name"
            type="text"
            className={styles.input}
            value={fields.name}
            onChange={e => handleChange('name', e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            autoComplete="name"
          />
          <div className={styles.fieldLine} />
        </div>

        {/* Email */}
        <div className={`${styles.field} ${focused === 'email' ? styles.focused : ''} ${errors.email ? styles.fieldError : ''}`}>
          <label className={`${styles.label} mono`}>{txt.email}</label>
          <input
            name="reply_to"
            type="email"
            className={styles.input}
            value={fields.email}
            onChange={e => handleChange('email', e.target.value)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            autoComplete="email"
          />
          <div className={styles.fieldLine} />
        </div>
      </div>

      {/* Subject */}
      <div className={`${styles.field} ${focused === 'subject' ? styles.focused : ''}`}>
        <label className={`${styles.label} mono`}>{txt.subject}</label>
        <div className={styles.selectWrapper}>
          <select
            name="subject"
            className={`${styles.input} ${styles.select}`}
            value={fields.subject}
            onChange={e => handleChange('subject', e.target.value)}
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused(null)}
          >
            <option value="">—</option>
            {txt.subjectOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <svg className={styles.selectArrow} width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.fieldLine} />
      </div>

      {/* Message */}
      <div className={`${styles.field} ${styles.fieldTextarea} ${focused === 'message' ? styles.focused : ''} ${errors.message ? styles.fieldError : ''}`}>
        <label className={`${styles.label} mono`}>{txt.message.replace('...', '')}</label>
        <textarea
          name="message"
          className={`${styles.input} ${styles.textarea}`}
          value={fields.message}
          placeholder={txt.message}
          onChange={e => handleChange('message', e.target.value)}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          rows={5}
        />
        <div className={styles.fieldLine} />
      </div>

      {/* Actions */}
      <div className={styles.formBottom}>
        <button
          type="submit"
          className={`${styles.submitBtn} ${status === 'sending' ? styles.submitting : ''}`}
          disabled={status === 'sending'}
        >
          <span className={styles.submitText}>
            {status === 'sending' ? txt.sending : txt.send}
          </span>
          <span className={styles.submitArrow}>
            {status === 'sending' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" className={styles.spinner}>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="20" strokeDashoffset="10" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </button>

        {status === 'error' && (
          <p className={`${styles.errorMsg} mono`}>
            {txt.errorMsg}{' '}
            <a href="mailto:zouaoui.mohamedskander@gmail.com" className={styles.errorLink}>
              zouaoui.mohamedskander@gmail.com
            </a>
          </p>
        )}

        <a href="mailto:zouaoui.mohamedskander@gmail.com" className={`${styles.mailtoFallback} mono`}>
          {txt.orEmail} ↗
        </a>
      </div>
    </form>
  )
}
