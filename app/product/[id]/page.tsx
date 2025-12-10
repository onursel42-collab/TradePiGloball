export default function ProductPage({ params }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Ürün Sayfası</h1>
      <p>Ürün ID: {params.id}</p>
    </div>
  );
}
