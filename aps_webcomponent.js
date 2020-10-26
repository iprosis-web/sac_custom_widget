(function() {
	let template = document.createElement("template");
	template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Custom Widget Text</legend>
                <table>
                    <tr>
                        <td>Text</td>
                        <td><input id="aps_text" type="string"></td>
                    </tr>
                </table>
            </fieldset>
        </form>
	`;

	class HelloWorldAps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById('form').addEventListener('submit', this._submit.bind(this));
		}

        _submit(event) {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        widgetText: this.widgetText
                    }
                }
            }))
        }

        // Setters and Getters
        set widgetText(newText) {
            this._shadowRoot.getElementById('aps_text').value = newText;
        }

        get widgetText() {
            return this.shadowRoot.getElementById('aps_text').value;
        }

	}

customElements.define("com-sap-sample-helloworld2-aps", HelloWorldAps);
})();