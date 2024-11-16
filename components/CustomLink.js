import Link from 'next/link';

export default function CustomLink({ as, href, children, ...otherProps }) {
  return (
    <Link as={as} href={href}>
      <a {...otherProps} aria-label={children || href}>
        {children}
      </a>
    </Link>
  );
}
