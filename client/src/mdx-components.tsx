import { Typography } from '@shared/ui';
import type { MDXComponents } from 'mdx/types';
import { CSSProperties } from 'react';
import { List } from './components/MDXComponents/List/List';
import { ListItem } from './components/MDXComponents/ListItem/ListItem';
import { Table } from './components/MDXComponents/Table/Table';
import { TableCell } from './components/MDXComponents/TableCell/TableCell';

const headingStyles = {
	color: 'var(--legal-title)',
	padding: '0.5rem 0',
} satisfies CSSProperties;

const components = {
	wrapper: ({ children }) => <>{children}</>,
	h1: ({ children }) => (
		<Typography as="h1" variant="h3" style={headingStyles}>
			{children}
		</Typography>
	),
	h2: ({ children }) => (
		<Typography as="h2" variant="h4" style={headingStyles}>
			{children}
		</Typography>
	),
	h3: ({ children }) => (
		<Typography as="h3" variant="h5" weight="semibold" style={headingStyles}>
			{children}
		</Typography>
	),
	h4: ({ children }) => (
		<Typography as="h4" variant="h5" weight="semibold" style={headingStyles}>
			{children}
		</Typography>
	),
	h5: ({ children }) => (
		<Typography as="h5" variant="h6" weight="semibold" style={headingStyles}>
			{children}
		</Typography>
	),
	h6: ({ children }) => (
		<Typography as="h6" variant="h6" weight="semibold" style={headingStyles}>
			{children}
		</Typography>
	),
	p: ({ children }) => (
		<Typography
			variant="body1"
			color="secondary"
			style={{
				padding: '0.5rem 0',
				fontSize: '0.875rem',
			}}
		>
			{children}
		</Typography>
	),
	ul: ({ children }) => <List as="ul">{children}</List>,
	ol: ({ children }) => <List as="ol">{children}</List>,
	li: ({ children }) => <ListItem>{children}</ListItem>,
	hr: () => (
		<hr
			style={{ margin: '1rem 0', color: 'var(--legal-border)', opacity: 0.3 }}
		/>
	),
	a: ({ children, href }) => (
		<Typography
			variant="body1"
			as="a"
			href={href}
			style={{ color: 'var(--legal-link)' }}
		>
			{children}
		</Typography>
	),
	table: ({ children }) => <Table>{children}</Table>,
	th: ({ children }) => <TableCell as="th">{children}</TableCell>,
	td: ({ children }) => <TableCell as="td">{children}</TableCell>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
