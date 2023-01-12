const Grafo = () => {
  
  const vertices = [];

  const inserirAresta = (pai, id, peso) => {
    if (vertices[pai]) {
      vertices[pai].push({ id, peso });
    } else {
      vertices[pai] = [{ id, peso }];
    }
  };

  const getVertices = () => {
    return vertices;
  };

  const getLength = () => {
    return vertices.length;
  };

  const getArestas = (id) => { 
    return vertices[id];
  };

  return { inserirAresta, getVertices, getLength, getArestas };

}

const FilaPrioridade = () => {
  const info = [];

  const inserir = (id, distancia) => {
    info.push({ id, distancia });
  };

  const removerMenor = () => {
    let idxMenor = 0;
    for (let i = 1; i < info.length; i++) {
      if (info[i].distancia < info[idxMenor].distancia) {
        idxMenor = i;
      }
    }
    return info.splice(idxMenor, 1)[0].id;
  };

  const editar = (id, distancia) => {
    for (let i = 0; i < info.length; i++) {
      if (info[i].id === id) {
        info[i].distancia = distancia;
        break;
      }
    }
  };

  const ehVazia = () => {
    return info.length === 0;
  };

  const log = () => {
    console.log(info);
  };

  return { inserir, removerMenor, editar, ehVazia, log };
}

const dijkstra = (grafo, s) => {
  const nVertices = grafo.getLength();
  const maduros = [];
  const pais = [];
  const distancia = [];

  for (let v = 0; v < nVertices; v++) {
    pais[v] = -1;
    maduros[v] = false;
    distancia[v] = Number.MAX_SAFE_INTEGER;
  }

  pais[s] = s;
  distancia[s] = 0;
  
  const PQ = FilaPrioridade();

  for (let v = 0; v < nVertices; v++) {
    PQ.inserir(v, distancia[v]);
  }

  while (!PQ.ehVazia()) {
    const y = PQ.removerMenor();
    if(distancia[y] === Number.MAX_SAFE_INTEGER) break;
    grafo.getArestas(y).forEach((a) => {
      if (!maduros[a.id]) {
        if (distancia[a.id] > distancia[y] + a.peso) {
          distancia[a.id] = distancia[y] + a.peso;
          PQ.editar(a.id, distancia[a.id]);
          pais[a.id] = y;
        }
      }
    });
    maduros[y] = true;
  }

  return { pais, distancia };
}

const grafo = Grafo();

const input = require("fs").readFileSync(__dirname + "\\dijkstra.txt", "utf8");
const lines = input.split("\r").join("").split("\n");

const S = parseInt(lines.shift());

let line = lines.shift();

while (line) {
  let [origem, destino, peso] = line.split(" ").map((x) => parseInt(x));
  grafo.inserirAresta(origem, destino, peso);
  grafo.inserirAresta(destino, origem, peso);
  line = lines.shift();
}

console.log(grafo.getVertices());
console.log(dijkstra(grafo, S));