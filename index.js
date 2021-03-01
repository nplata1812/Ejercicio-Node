var http = require("http");
var fs = require("fs");
const axios = require("axios");

http
  .createServer(function (request, response) {
    if (request.url === "/api/proveedores") {
      fs.readFile("index.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        let body = data.toString().replace(
          "{{thead}}",
          `
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>
        <th scope="col">Contacto</th>
        `
        );
        body = body.replace("{{title}}", "Proveedores");
        let proveedores;
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
          )
          .then((result) => {
            proveedores = result;
            let newString;

            for (let index = 0; index < proveedores.data.length; index++) {
              const element = proveedores.data[index];
              newString += `
              <tr>
              <th scope="row">IdProveedor</th>
              <td>NombreProveedor</td>
              <td>ContactoProveedor</td>
              </tr>
              `;
              newString = newString.replace("IdProveedor", element.idproveedor);
              newString = newString.replace(
                "NombreProveedor",
                element.nombrecompania
              );
              newString = newString.replace(
                "ContactoProveedor",
                element.nombrecontacto
              );
              newString = newString.replace("undefined", "");
            }
            body = body.replace("{{info}}", newString);
            response.end(body);
          });
      });
    } else if (request.url === "/api/clientes") {
      fs.readFile("index.html", function (err, data) {
        response.writeHead(200, { "Content-Type": "text/html" });
        let body = data.toString().replace(
          "{{thead}}",
          `
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>
        <th scope="col">Contacto</th>
        `
        );
        body = body.replace("{{title}}", "Clientes");
        let proveedores;
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
          )
          .then((result) => {
            proveedores = result;
            let newString;

            for (let index = 0; index < proveedores.data.length; index++) {
              const element = proveedores.data[index];
              newString += `
              <tr>
              <th scope="row">IdProveedor</th>
              <td>NombreProveedor</td>
              <td>ContactoProveedor</td>
              </tr>
              `;
              newString = newString.replace("IdProveedor", element.idCliente);
              newString = newString.replace(
                "NombreProveedor",
                element.NombreCompania
              );
              newString = newString.replace(
                "ContactoProveedor",
                element.NombreContacto
              );
              newString = newString.replace("undefined", "");
            }
            body = body.replace("{{info}}", newString);
            response.end(body);
          });
      });
    }
  })
  .listen(8081);
