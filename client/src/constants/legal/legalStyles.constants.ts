export const LEGAL_STYLES = `
<style>
  [data-custom-class='body'], [data-custom-class='body'] * {
		background: transparent !important;
	}
	[data-custom-class='title'], [data-custom-class='title'] * {
		font-family: Arial !important;
		font-size: 26px !important;
		color: var(--legal-title) !important;
	}
	[data-custom-class='subtitle'], [data-custom-class='subtitle'] * {
		font-family: Arial !important;
		color: var(--legal-subtitle) !important;
		font-size: 14px !important;
	}
	[data-custom-class='heading_1'], [data-custom-class='heading_1'] * {
		font-family: Arial !important;
		font-size: 19px !important;
		color: var(--legal-title) !important;
	}
	[data-custom-class='heading_2'], [data-custom-class='heading_2'] * {
		font-family: Arial !important;
		font-size: 17px !important;
		color: var(--legal-title) !important;
	}
	[data-custom-class='body_text'], [data-custom-class='body_text'] * {
		color: var(--legal-text) !important;
		font-size: 14px !important;
		font-family: Arial !important;
	}
	[data-custom-class='link'], [data-custom-class='link'] * {
		color: var(--legal-link) !important;
		font-size: 14px !important;
		font-family: Arial !important;
		word-break: break-word !important;
	}
	[data-custom-class='body'] th,
	[data-custom-class='body'] td {
		border-left: 1px solid white !important;
		border-right: 1px solid white !important;
		border-top: 1px solid white !important;
	}
	[data-custom-class='body'] th:nth-child(2),
	[data-custom-class='body'] td:nth-child(2) {
		border-left: none !important;
		border-right: none !important;
	}
	[data-custom-class='body'] tr:last-child td,
	[data-custom-class='body'] tr:last-child th {
		border-bottom: 1px solid white !important;
	}
	</style>
	`;
// [data-custom-class='body'] ul {
// 	display: block !important;
// 	list-style-type: disc !important;
// 	margin-top: 0 !important;
// 	margin-bottom: 0 !important;
// 	padding-inline-start: 40px !important;
// }
// [data-custom-class='body'] li {
// 	display: list-item !important;
// 	margin-bottom: 8px !important;
// }
// [data-custom-class='body'] li::marker {
// 	color: red !important;
// }
// [data-custom-class='body'] ul + div,
// [data-custom-class='body'] div + ul {
// 	margin: 0 !important;
// 	padding: 0 !important;
// 	display: contents !important;
// }
