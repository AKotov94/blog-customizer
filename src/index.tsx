import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';

import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type PageStyles = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

const App = () => {
	const defaultState: PageStyles = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};
	const [currenStyles, setCurrentStyles] = useState(defaultState);

	const applyStyles = (newStyles: PageStyles) => {
		setCurrentStyles(newStyles);
	};
	const resetStyles = () => {
		setCurrentStyles(defaultState);
	};

	return (
		<main className={clsx(styles.main)} style={currenStyles as CSSProperties}>
			<ArticleParamsForm onSubmit={applyStyles} onReset={resetStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
