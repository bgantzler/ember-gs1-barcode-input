# Application identifiers

Application identifiers content

{{#docs-demo as |demo|}}
  {{#demo.example name="application-identifiers.hbs"}}
    <table>
     <tr><th>Code</th><th>Name</th><th>Description</th></tr>
    {{#each AICodes as |code|}}
      <tr>
      {{#let (get AIs code) as |AI|}}
        <td>{{get AI "code"}}</td> <td>{{get AI "name"}}</td> <td>{{get AI "description"}}</td>
      {{/let}}
      </tr>
    {{/each}}
    </table>
  {{/demo.example}}
{{/docs-demo}}
