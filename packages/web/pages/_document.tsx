// For React JSS
import { Fragment } from 'react'
import Document, { DocumentContext } from 'next/document'
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const registry = new SheetsRegistry()
		const generateId = createGenerateId()
		const originalRenderPage = ctx.renderPage
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => (
					<JssProvider registry={registry} generateId={generateId}>
						<App {...props} />
					</JssProvider>
				),
			})

		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			styles: (
				<Fragment>
					{initialProps.styles}
					<style id="server-side-styles"> {registry.toString()} </style>
				</Fragment>
			),
		}
	}
}
