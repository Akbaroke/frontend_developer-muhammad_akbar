export type PropsNavLink = {
  title: string;
  href: string;
};

export default function NavLink({ title, href }: PropsNavLink) {
  return (
    <a
      href={href}
      id="navLink"
      className={title.toLowerCase() === 'ideas' ? 'active' : ''}>
      {title}
    </a>
  );
}
