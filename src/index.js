// index.js

class App {
    constructor(root) {
      this.root = root;
      this.routes = {
        home: this.renderHome.bind(this),
        add: this.renderAddDestination.bind(this),
        list: this.renderList.bind(this),
      };
      this.destinations = [];
      this.init();
    }
  
    init() {
      this.render();
      window.addEventListener("hashchange", () => this.render());
    }
  
    render() {
      const route = window.location.hash.replace("#", "") || "home";
      this.root.innerHTML = "";
      (this.routes[route] || this.renderNotFound).call(this);
    }
  
    renderHome() {
      const container = document.createElement("div");
      container.innerHTML = `
        <h1>Lista de Viagens</h1>
        <button onclick="location.hash='add'">Adicionar Destino</button>
        <a href="#list">Lista</a>
      `;
      this.root.appendChild(container);
    }
  
    renderAddDestination() {
      const container = document.createElement("div");
      container.innerHTML = `
        <h1>Adicionar Destino</h1>
        <form id="destination-form">
          <input type="text" id="name" placeholder="Nome do destino" required />
          <input type="text" id="country" placeholder="País" required />
          <textarea id="description" placeholder="Motivo da escolha"></textarea>
          <button type="submit">Salvar</button>
        </form>
        <button onclick="location.hash='home'">Voltar</button>
      `;
      this.root.appendChild(container);
  
      document.getElementById("destination-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const country = document.getElementById("country").value;
        const description = document.getElementById("description").value;
        this.destinations.push({ name, country, description });
        location.hash = "list";
      });
    }
  
    renderList() {
      this.root.innerHTML = ""; // Limpa a tela antes de renderizar
      const container = document.createElement("div");
      container.innerHTML = `
        <h1>Destinos Cadastrados</h1>
        <a href="#home">Voltar</a>
        <div id="destination-cards"></div>
      `;
      this.root.appendChild(container);
      this.updateList();
    }
  
    updateList() {
      const listContainer = document.getElementById("destination-cards");
      if (!listContainer) return;
      listContainer.innerHTML = ""; // Evita duplicação
      this.destinations.forEach((d, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <strong>${d.name} (${d.country})</strong>
          <p>${d.description}</p>
          <button onclick="app.removeDestination(${index})">Remover</button>
        `;
        listContainer.appendChild(card);
      });
    }
  
    removeDestination(index) {
      this.destinations.splice(index, 1);
      this.renderList();
    }
  }
  
  const app = new App(document.getElementById("root"));
  