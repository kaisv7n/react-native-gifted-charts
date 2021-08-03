import React, {useEffect} from 'react';
import {View, FlatList, Animated, Easing, Text, ColorValue} from 'react-native';
import {styles} from './styles';
import RenderBars from './RenderBars';

type PropTypes = {
  width?: number;
  height?: number;
  noOfSections?: number;
  maxValue?: number;
  stepHeight?: number;
  stepValue?: number;
  spacing?: number;
  data?: any;
  // oldData?: any,
  side?: String;
  rotateLabel?: Boolean;
  isAnimated?: Boolean;
  animationDuration?: number;
  animationEasing?: any;
  opacity?: number;
  isThreeD?: Boolean;
  xAxisThickness?: number;
  xAxisColor?: ColorValue;
  yAxisThickness?: number;
  yAxisColor?: ColorValue;
  yAxisTextStyle?: any;
  yAxisLabelWidth?: number;
  hideYAxisText?: Boolean;
  initialSpacing?: number;
  barWidth?: number;

  cappedBars?: Boolean;
  capThickness?: number;
  capColor?: ColorValue;
  capRadius?: number;

  hideAxesAndRules?: Boolean;
  hideRules?: Boolean;
  rulesColor?: ColorValue;
  rulesThickness?: number;
  showVerticalLines?: Boolean;
  verticalLinesThickness?: number;
  verticalLinesColor?: ColorValue;
  verticalLinesZIndex?: number;

  showYAxisIndices?: Boolean;
  showXAxisIndices?: Boolean;
  yAxisIndicesHeight?: number;
  xAxisIndicesHeight?: number;
  yAxisIndicesWidth?: number;
  xAxisIndicesWidth?: number;
  xAxisIndicesColor?: ColorValue;
  yAxisIndicesColor?: ColorValue;

  showFractionalValues?: Boolean;
  backgroundColor?: ColorValue;

  disableScroll?: Boolean;
  showScrollIndicator?: Boolean;
  roundedTop?: Boolean;
  roundedBottom?: Boolean;
  disablePress?: Boolean;

  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  gradientColor?: ColorValue;
  showGradient?: Boolean;
  activeOpacity?: number;

  horizontal?: Boolean;
  yAxisAtTop?: Boolean;

  intactTopLabel?: Boolean;

  horizSections?: Array<sectionType>;
};
type sectionType = {
  value: number;
};
type itemType = {
  value?: number;
  onPress?: any;
  frontColor?: ColorValue;
  sideColor?: ColorValue;
  topColor?: ColorValue;
  showGradient?: Boolean;
  gradientColor?: any;
  label?: String;
  barWidth?: number;
  labelTextStyle?: any;
  topLabelComponent?: Function;
  topLabelContainerStyle?: any;
  disablePress?: any;
  labelComponent?: View;
};

export const BarChart = (props: PropTypes) => {
  const containerHeight = props.height || 200;
  const noOfSections = props.noOfSections || 10;
  const horizSections = [{value: 0}];
  const maxValue = props.maxValue || 200;
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const stepValue = props.stepValue || maxValue / noOfSections;
  const spacing = props.spacing === 0 ? 0 : props.spacing ? props.spacing : 20;
  const data = props.data || [];
  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
  const initialSpacing =
    props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
  // const oldData = props.oldData || [];
  const side = props.side || '';
  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const animationDuration = props.animationDuration || 800;
  const animationEasing = props.animationEasing || Easing.ease;
  const opacity = props.opacity || 1;
  const isThreeD = props.isThreeD || false;

  const showVerticalLines = props.showVerticalLines || false;
  const rulesThickness =
    props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
  const rulesColor = props.rulesColor || 'lightgray';
  const verticalLinesThickness =
    props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;

  const showYAxisIndices = props.showYAxisIndices || false;
  const showXAxisIndices = props.showXAxisIndices || false;
  const yAxisIndicesHeight = props.yAxisIndicesHeight || 2;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const yAxisIndicesWidth = props.yAxisIndicesWidth || 4;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';
  const yAxisIndicesColor = props.yAxisIndicesColor || 'black';

  const xAxisThickness =
    props.xAxisThickness === 0
      ? props.xAxisThickness
      : props.xAxisThickness || 1;
  const xAxisColor = props.xAxisColor || 'black';

  const hideRules = props.hideRules || false;

  const yAxisThickness =
    props.yAxisThickness === 0
      ? props.yAxisThickness
      : props.yAxisThickness || 1;
  const yAxisColor = props.yAxisColor || 'black';
  const yAxisTextStyle = props.yAxisTextStyle;
  const showFractionalValues = props.showFractionalValues || false;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;
  const hideYAxisText = props.hideYAxisText || false;

  const backgroundColor = props.backgroundColor || 'transparent';
  const horizontal = props.horizontal || false;
  const yAxisAtTop = props.yAxisAtTop || false;
  const intactTopLabel = props.intactTopLabel || false;

  horizSections.pop();
  for (let i = 0; i <= noOfSections; i++) {
    horizSections.push({value: maxValue - stepValue * i});
  }

  const heightValue = new Animated.Value(0);
  const opacValue = new Animated.Value(0);

  let totalWidth = spacing;
  data.forEach((item: itemType) => {
    totalWidth += (item.barWidth || props.barWidth || 30) + spacing;
  });

  const labelsAppear = () => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const moveBar = () => {
    heightValue.setValue(0);
    Animated.timing(heightValue, {
      toValue: 1,
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: false,
    }).start();
  };
  // console.log('olddata', oldData);

  useEffect(() => {
    moveBar();
    setTimeout(() => labelsAppear(), animationDuration);
  }, []);

  const animatedHeight = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderHorizSections = () => {
    return (
      <>
        {horizSections.map((sectionItems, index) => {
          return (
            <View key={index} style={[styles.horizBar, {width: totalWidth}]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    borderRightWidth: yAxisThickness,
                    borderColor: yAxisColor,
                  },
                  horizontal &&
                    !yAxisAtTop && {
                      transform: [{translateX: totalWidth + yAxisThickness}],
                    },
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                ]}>
                {!hideYAxisText && index !== noOfSections && (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      horizontal && {
                        transform: [
                          {rotate: '270deg'},
                          {translateY: yAxisAtTop ? 0 : 50},
                        ],
                      },
                    ]}>
                    {showFractionalValues
                      ? sectionItems.value || ''
                      : sectionItems.value
                      ? sectionItems.value.toString().split('.')[0]
                      : ''}
                  </Text>
                )}
              </View>
              <View
                style={[
                  index === noOfSections
                    ? styles.lastLeftPart
                    : styles.leftPart,
                  {backgroundColor: backgroundColor},
                ]}>
                {index === noOfSections ? (
                  <View
                    style={[
                      styles.line,
                      {height: xAxisThickness, backgroundColor: xAxisColor},
                    ]}
                  />
                ) : hideRules ? null : (
                  <View
                    style={[
                      styles.line,
                      {
                        height: rulesThickness,
                        backgroundColor: rulesColor,
                      },
                    ]}
                  />
                )}
                {showYAxisIndices && index !== noOfSections ? (
                  <View
                    style={[
                      {
                        position: 'absolute',
                        height: yAxisIndicesHeight,
                        width: yAxisIndicesWidth,
                        left: yAxisIndicesWidth / -2,
                        backgroundColor: yAxisIndicesColor,
                      },
                      horizontal &&
                        !yAxisAtTop && {
                          transform: [
                            {translateX: totalWidth + yAxisThickness},
                          ],
                        },
                    ]}
                  />
                ) : null}
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: containerHeight,
        },
        props.width && {width: props.width},
        horizontal && {transform: [{rotate: '90deg'}, {translateY: -15}]},
      ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      <FlatList
        style={[
          {
            marginLeft: initialSpacing + 6,
            position: 'absolute',
            bottom: stepHeight * -0.5 - 60,
          },
          horizontal && {width: totalWidth},
        ]}
        scrollEnabled={!disableScroll}
        contentContainerStyle={{
          height: containerHeight + 130,
          width: totalWidth,
          paddingLeft: (data[0].barWidth || props.barWidth || 30) / 2,
          // backgroundColor: 'black',
          alignItems: 'flex-end',
        }}
        showsHorizontalScrollIndicator={showScrollIndicator}
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <RenderBars
            item={item}
            index={index}
            containerHeight={containerHeight}
            maxValue={maxValue}
            spacing={spacing}
            side={side}
            data={data}
            barWidth={props.barWidth}
            opacity={opacity}
            isThreeD={isThreeD}
            isAnimated={isAnimated}
            animationDuration={animationDuration}
            rotateLabel={rotateLabel}
            animatedHeight={animatedHeight}
            appearingOpacity={appearingOpacity}
            roundedTop={props.roundedTop}
            roundedBottom={props.roundedBottom}
            disablePress={props.disablePress}
            frontColor={props.frontColor}
            sideColor={props.sideColor}
            topColor={props.topColor}
            showGradient={props.showGradient}
            gradientColor={props.gradientColor}
            activeOpacity={props.activeOpacity}
            cappedBars={props.cappedBars}
            capThickness={props.capThickness}
            capColor={props.capColor}
            capRadius={props.capRadius}
            showVerticalLines={showVerticalLines}
            verticalLinesThickness={verticalLinesThickness}
            verticalLinesColor={verticalLinesColor}
            verticalLinesZIndex={verticalLinesZIndex}
            showXAxisIndices={showXAxisIndices}
            xAxisIndicesHeight={xAxisIndicesHeight}
            xAxisIndicesWidth={xAxisIndicesWidth}
            xAxisIndicesColor={xAxisIndicesColor}
            horizontal={horizontal}
            intactTopLabel={intactTopLabel}
          />
        )}
      />
    </View>
  );
};