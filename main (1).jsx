import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const products = [
  { id: 1, name: "Fone Bluetooth Pro", price: 89.90, old: 129.90, icon: "🎧", description: "Fone sem fio compacto com estojo de carregamento." },
  { id: 2, name: "Garrafa Térmica 500ml", price: 59.90, old: 79.90, icon: "🥤", description: "Garrafa reutilizável para bebidas quentes ou frias." },
  { id: 3, name: "Suporte Magnético", price: 39.90, old: 54.90, icon: "📱", description: "Suporte compacto para celular, ideal para mesa e carro." },
  { id: 4, name: "Luminária LED", price: 74.90, old: 99.90, icon: "💡", description: "Luminária moderna para estudo, trabalho e decoração." },
];

const money = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((items) => [...items, product]);
    setPage("cart");
  };

  const removeFromCart = (index) => {
    setCart((items) => items.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const openProduct = (product) => {
    setSelected(product);
    setPage("product");
  };

  return (
    <div className="app">
      <header className="header">
        <button className="brand" onClick={() => setPage("home")}>Nexa Store</button>
        <button className="cart-button" onClick={() => setPage("cart")}>
          🛒 Carrinho <span>{cart.length}</span>
        </button>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <small>OFERTA DA SEMANA</small>
            <h1>Produtos que facilitam seu dia.</h1>
            <p>Uma vitrine moderna para vender produtos de fornecedores sem manter estoque próprio.</p>
            <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
              Ver produtos
            </button>
          </section>

          <section id="products">
            <div className="section-title">
              <h2>Mais vendidos</h2>
              <span>{products.length} produtos</span>
            </div>

            <div className="grid">
              {products.map((product) => (
                <article className="card" key={product.id} onClick={() => openProduct(product)}>
                  <div className="product-image">{product.icon}</div>
                  <div className="card-body">
                    <small>Oferta</small>
                    <h3>{product.name}</h3>
                    <strong>{money(product.price)}</strong>
                    <del>{money(product.old)}</del>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === "product" && selected && (
        <main>
          <button className="back" onClick={() => setPage("home")}>← Voltar</button>
          <section className="product-detail">
            <div className="product-image large">{selected.icon}</div>
            <div className="detail-body">
              <small>OFERTA ESPECIAL</small>
              <h1>{selected.name}</h1>
              <p>{selected.description}</p>
              <div className="price">
                <strong>{money(selected.price)}</strong>
                <del>{money(selected.old)}</del>
              </div>
              <button className="primary" onClick={() => addToCart(selected)}>
                Adicionar ao carrinho
              </button>
            </div>
          </section>
        </main>
      )}

      {page === "cart" && (
        <main>
          <button className="back" onClick={() => setPage("home")}>← Continuar comprando</button>
          <h1>Seu carrinho</h1>

          {cart.length === 0 ? (
            <div className="empty">Seu carrinho está vazio.</div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((product, index) => (
                  <div className="cart-item" key={`${product.id}-${index}`}>
                    <div className="mini-image">{product.icon}</div>
                    <div className="cart-info">
                      <strong>{product.name}</strong>
                      <span>{money(product.price)}</span>
                    </div>
                    <button onClick={() => removeFromCart(index)}>Remover</button>
                  </div>
                ))}
              </div>

              <div className="checkout">
                <div><span>Total</span><strong>{money(total)}</strong></div>
                <button className="primary" onClick={() => alert("Aqui será integrado o checkout real.")}>
                  Finalizar pedido
                </button>
              </div>
            </>
          )}
        </main>
      )}

      <nav className="bottom-nav">
        <button onClick={() => setPage("home")}>⌂ Início</button>
        <button onClick={() => setPage("cart")}>🛒 Carrinho</button>
        <button onClick={() => setPage("admin")}>⚙ Admin</button>
      </nav>

      {page === "admin" && (
        <main className="admin">
          <button className="back" onClick={() => setPage("home")}>← Loja</button>
          <h1>Painel administrativo</h1>
          <div className="stats">
            <div><small>Pedidos</small><strong>24</strong></div>
            <div><small>Vendas</small><strong>R$ 2.480</strong></div>
            <div><small>Produtos</small><strong>38</strong></div>
          </div>
          <div className="panel">
            <h2>Pedidos recentes</h2>
            <p>#1048 · Fone Bluetooth <b>Pago</b></p>
            <p>#1047 · Garrafa térmica <b>Enviado</b></p>
            <p>#1046 · Suporte celular <b>Processando</b></p>
          </div>
        </main>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
