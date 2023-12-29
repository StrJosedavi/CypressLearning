import cypress from "cypress";

const visitarPagina = () => {
  cy.visit(
    "https://staging-new-dashboard.easycredito.com.br/dashboard/companies"
  );
};

describe("Validação pagina de acordo com o Figma", () => {
  beforeEach(() => {
    visitarPagina();
  });

  //*****************************************************/
  it("Buscar botões de Bloquear e Detalhes", () => {
    cy.viewport(1920, 1080);

    // Iterar sobre cada chave do objeto de textos esperados
    cy.get(".css-1csqgpf").each(($cartao, index) => {
      // Dentro de cada cartão, encontrar os botões
      const ButtonBlock = $cartao.find(".MuiButton-root").first();
      const buttonDetail = $cartao.find(".MuiButton-root").eq(1);

      // Obter o texto dos botões
      const textBlock = ButtonBlock.text().trim();
      const textDetail = buttonDetail.text().trim();

      // Comparar texto localizado no botão com o esperado
      expect(textBlock).to.equal("Bloquear");
      expect(textDetail).to.equal("Detalhes");
    });
  });

  //*****************************************************/
  it("Digitar no campo de pesquisa", () => {
    cy.viewport(1920, 1080);

    const textoParaDigitar = "Testando";

    cy.get(".MuiInputBase-root").type(textoParaDigitar);

    cy.wait(1000);

    cy.get("input#\\:r0\\:").invoke("val").should("eq", textoParaDigitar);
  });
  //-----
  it("Buscar botões de Pesquisar e Adicionar Empresa", () => {
    cy.viewport(1920, 1080);

    const ButtonBusiness = "Adicionar Empresa";
    const ButtonSearch = "Pesquisar";

    cy.contains(ButtonBusiness).click();
    cy.contains(ButtonSearch).click();
  });

  //*****************************************************/
  it("Buscar cabeçalho empresas", () => {
    cy.viewport(1920, 1080);

    const Header = "Empresas";

    cy.get(".MuiTypography-h4").should("have.text", Header);
  });

  //*****************************************************/
  it("Marcar o checkbox e desmarcar o checkbox", () => {
    cy.viewport(1920, 1080);

    cy.get(".PrivateSwitchBase-input").check();
    cy.get('input[type="checkbox"]').should("be.checked");

    cy.get(".PrivateSwitchBase-input").uncheck();
    cy.get('input[type="checkbox"]').should("not.be.checked");
  });

  //*****************************************************/
  it("Responsividade da pagina", () => {
    cy.viewport("macbook-15");
    cy.wait(2000);

    cy.viewport("iphone-x", "landscape");
    cy.wait(2000);

    cy.viewport("ipad-2");
    cy.wait(2000);

    cy.viewport("iphone-x");
    cy.wait(2000);

    cy.viewport("iphone-6");
    cy.wait(2000);
  });
});
