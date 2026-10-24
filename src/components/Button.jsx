export default function Button({ variant, className = '', children, ...rest }) {
  const cls = ['btn', variant && `btn--${variant}`, className].filter(Boolean).join(' ')
  return <button className={cls} {...rest}>{children}</button>
}
