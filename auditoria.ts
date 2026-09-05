import { readFile, writeFile } from "fs/promises";

type ItemEstoque = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

type RelatorioAuditoria = {
  valorTotalEstoque: number;
  produtosCriticos: ItemEstoque[];
};

readFile("./estoque.json", "utf-8")
  .then((conteudo: string) => {
    const estoque: ItemEstoque[] = JSON.parse(conteudo);

    const valorTotalEstoque = Number(
      estoque
        .reduce((total, item) => total + item.preco * item.quantidade, 0)
        .toFixed(2)
    );

    const produtosCriticos = estoque.filter((item) => item.quantidade < 5);

    const relatorio: RelatorioAuditoria = {
      valorTotalEstoque,
      produtosCriticos,
    };

    return writeFile("./auditoria.json", JSON.stringify(relatorio, null, 2), "utf-8");
  })

  .then(() => {
    console.log("Auditoria concluída. Relatório salvo em ./auditoria.json");
  })
  
  .catch((erro: NodeJS.ErrnoException | null) => {
    console.error("Erro na auditoria de estoque:", erro);
  });
