export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.lerapick.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}
