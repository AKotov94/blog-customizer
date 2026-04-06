import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { PageStyles } from 'src/index';

type onSubmit = (slyles: PageStyles) => void;
type onReset = () => void;

type ArticleParamsFormProps = {
	onSubmit: onSubmit;
	onReset: onReset;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const [currentFontFamily, setCurrentFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const toggle = () => setIsOpen((prev) => !prev);

	const handleApplyButton = (): PageStyles => {
		return {
			'--font-family': currentFontFamily.value,
			'--font-size': currentFontSize.value,
			'--font-color': currentFontColor.value,
			'--bg-color': currentBackgroundColor.value,
			'--container-width': currentContentWidth.value,
		};
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: containerRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<div ref={containerRef}>
				<ArrowButton isOpen={isOpen} onClick={toggle} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit(handleApplyButton());
						}}
						onReset={(e) => {
							e.preventDefault();
							onReset();
						}}>
						<div className={styles.optionsContainer}>
							<Text size={31} weight={800} uppercase={true}>
								задайте параметры
							</Text>
							<Select
								selected={currentFontFamily}
								options={fontFamilyOptions}
								onChange={(selected) => setCurrentFontFamily(selected)}
								title='шрифт'
							/>
							<RadioGroup
								name={'fontSize'}
								selected={currentFontSize}
								options={fontSizeOptions}
								onChange={(value) => setCurrentFontSize(value)}
								title='размер шрифта'
							/>
							<Select
								selected={currentFontColor}
								options={fontColors}
								onChange={(selected) => setCurrentFontColor(selected)}
								title='цвет шрифта'
							/>
							<Separator />
							<Select
								selected={currentBackgroundColor}
								options={backgroundColors}
								onChange={(selected) => setCurrentBackgroundColor(selected)}
								title='цвет фона'
							/>
							<Select
								selected={currentContentWidth}
								options={contentWidthArr}
								onChange={(selected) => setCurrentContentWidth(selected)}
								title='ширина контента'
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
