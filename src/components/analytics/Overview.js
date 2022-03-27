export default function Overview({ text, count }) {
  return (
    <section className="overview_section">
      <h3 className="overview_header">{text}</h3>
      <h1 className="overview_count">{count}</h1>
    </section>
  );
}
