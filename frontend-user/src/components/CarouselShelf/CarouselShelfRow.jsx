import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Box, Button, makeStyles} from "@material-ui/core";
import CarouselsShelfHeader from "./CarouselsShelfHeader/CarouselsShelfHeader";
import PaperIconWrapper from "../PaperIconWrapper/PaperIconWrapper";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CarouselsShelfItems from "./CarouselsShelfItems/CarouselsShelfItems";

const useStyles = makeStyles((theme) => ({
    navShelfIconsContainer: ({cardHeight, cardMarginEnd}) => ({
        position: "absolute",
        top: (cardHeight + 2 * cardMarginEnd) / 2,
        transform: "translate3d(-50%, -50%, 0)",
        borderRadius: "50%",
        zIndex: 2,
    }),
    navShelfIcon: {
        width: "var(--icon-button-width)",
        minWidth: "var(--icon-button-width)",
        height: "var(--icon-button-width)",
        zIndex: "inherit",
        borderRadius: "50%",
        boxShadow: theme.shadows[6],
    },
    prevIconContainer: {
        left: 0,
    },
    nextIconContainer: {
        left: "100%"
    },
}));

const CarouselShelfRow = memo(({carousel, getCardID, cardBaseWidth, cardBaseHeight, itemVariant, onItemClick, prefersDarkMode, cardMarginEnd}) => {
    const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(false);
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(true);
    const [scrollLeft, setScrollLeft] = useState(0);
    const classes = useStyles({
        cardHeight: cardBaseHeight,
        cardMarginEnd: cardMarginEnd,
    });

    const carouselContainerRef = useRef(null);
    const firstItemRef = useRef(null);
    const lastItemRef = useRef(null);

    const getScrollContainerValue = useMemo(() => {
        const style = getComputedStyle(document.body);
        const bodyWidth = parseInt(style.width);
        const appSpacing = parseInt(style.getPropertyValue("--app-spacing"));
        const movieCardWidth = cardBaseWidth + cardMarginEnd;
        const cardPossible = Math.floor((bodyWidth - appSpacing) / movieCardWidth);
        return cardPossible * movieCardWidth;
    }, [cardBaseWidth, cardMarginEnd]);

    const maxScrolling = carouselContainerRef.current ? (carouselContainerRef.current.scrollWidth - carouselContainerRef.current.clientWidth) : 0;

    const onPrevButtonClicked = useCallback(() => {
        if (carouselContainerRef) {
            carouselContainerRef.current.scrollLeft -= getScrollContainerValue;
            setScrollLeft(Math.max(scrollLeft - getScrollContainerValue, 0));
        }
    }, [carouselContainerRef, scrollLeft, getScrollContainerValue]);

    const onNextButtonClicked = useCallback(() => {
        if (carouselContainerRef) {
            carouselContainerRef.current.scrollLeft += getScrollContainerValue;
            setScrollLeft(Math.min(scrollLeft + getScrollContainerValue, maxScrolling))
        }
    }, [carouselContainerRef, scrollLeft, getScrollContainerValue, maxScrolling]);

    useEffect(() => {
        setIsPrevButtonVisible(scrollLeft > 0);
        setIsNextButtonVisible(scrollLeft < maxScrolling);
    }, [scrollLeft, maxScrolling, setIsPrevButtonVisible, setIsNextButtonVisible]);
    return (
        <Box component="section" className="mwtitle-section">
            <CarouselsShelfHeader title={carousel.title}/>
            <Box position="relative">
                <Box
                    className={[
                        classes.navShelfIconsContainer,
                        classes.prevIconContainer,
                    ].join(" ")}
                >
                    {isPrevButtonVisible && <PaperIconWrapper>
                        <Button
                            color="primary"
                            variant="contained"
                            aria-label="previous"
                            className={classes.navShelfIcon}
                            onClick={onPrevButtonClicked}
                        >
                            <ChevronLeft/>
                        </Button>
                    </PaperIconWrapper>}
                </Box>
                <CarouselsShelfItems
                    carousel={carousel}
                    carouselRef={carouselContainerRef}
                    dark={prefersDarkMode}
                    getCardID={getCardID}
                    cardWidth={cardBaseWidth}
                    cardHeight={cardBaseHeight}
                    itemVariant={itemVariant}
                    onItemClick={onItemClick ? onItemClick : null}
                    firstItemRef={firstItemRef}
                    lastItemRef={lastItemRef}
                />
                <Box
                    className={[
                        classes.navShelfIconsContainer,
                        classes.nextIconContainer,
                    ].join(" ")}
                >
                    {isNextButtonVisible && <PaperIconWrapper>
                        <Button
                            color="primary"
                            variant="contained"
                            aria-label="next"
                            className={classes.navShelfIcon}
                            onClick={onNextButtonClicked}
                        >
                            <ChevronRight/>
                        </Button>
                    </PaperIconWrapper>}
                </Box>
            </Box>
        </Box>
    );
});

export default CarouselShelfRow;
