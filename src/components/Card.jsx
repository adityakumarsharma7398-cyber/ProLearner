export default function Card({ tone, flat, as: Tag = 'section', className = '', children, ...rest }) {
  const cls = ['card', tone && `card--${tone}`, flat && 'card--flat', className].filter(Boolean).join(' ')
  return <Tag className={cls} {...rest}>{children}</Tag>
}
