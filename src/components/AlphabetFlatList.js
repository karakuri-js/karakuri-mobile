import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import { memoize, uniq } from 'lodash'

import PropTypes from 'prop-types'

const ALPHA_FONT_FAMILY = Platform.select({
  ios: 'Gill Sans',
  android: 'sans-serif',
})

const styleType = PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  mainFlatListContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  alphabetListContainerStyle: {
    flex: 0.2,
    backgroundColor: 'transparent',
  },
  alphabetButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetButtonContainerStyle: {
    flex: 1,
    paddingVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetTextStyle: {
    fontFamily: ALPHA_FONT_FAMILY,
    fontSize: 16,
    color: 'rgb(90,90,90)',
  },
  selectedAlphabetTextStyle: {
    fontFamily: ALPHA_FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgb(90,90,90)',
  },
})

const buildLetters = memoize(data => uniq(data.map(item => item[0].toUpperCase())))

export default class AlphabetFlatList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,
    viewabilityConfig: PropTypes.object,
    getItemLayout: PropTypes.func.isRequired,
    mainFlatListContainerStyle: styleType,
  }

  static defaultProps = {
    viewabilityConfig: {
      itemVisiblePercentThreshold: 100,
    },
    keyExtractor: (item, index) => index.toString(),
    mainFlatListContainerStyle: {},
  }

  constructor(props) {
    super(props)
    const letters = buildLetters(props.data)
    this.state = {
      alphabetList: letters,
      selectedLetter: letters[0],
    }
  }

  componentWillReceiveProps({ data }) {
    if (data !== this.props.data) {
      const letters = buildLetters(data)
      this.setState({
        alphabetList: letters,
        selectedLetter: letters[0],
      })
      this.mainList.scrollToIndex({
        animated: false,
        index: 0,
        viewPosition: 0,
      })
      this.letterList.scrollToIndex({
        animated: false,
        index: 0,
        viewPosition: 0,
      })
    }
  }

  handleScroll = ({ viewableItems }) => {
    const letter = viewableItems[0].item[0].toUpperCase()
    if (letter !== this.state.selectedLetter) {
      this.setState({ selectedLetter: letter })
    }
  }

  onPressLetter = selectedItem => {
    const matchedIndex = this.props.data.findIndex(
      item => item && item[0].toUpperCase() === selectedItem,
    )
    this.setState({ selectedLetter: selectedItem })
    this.mainList.scrollToIndex({
      animated: true,
      index: matchedIndex,
      viewPosition: 0,
    })
  }

  renderAlphabetItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.onPressLetter(item)}
      style={styles.alphabetButtonContainerStyle}
    >
      <View style={styles.alphabetButtonStyle}>
        <Text
          style={
            this.state.selectedLetter === item ? (
              styles.selectedAlphabetTextStyle
            ) : (
              styles.alphabetTextStyle
            )
          }
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  )

  alphabetKeyExtractor = (item, index) => index.toString()

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.mainFlatListContainerStyle, this.props.mainFlatListContainerStyle]}>
          <FlatList
            ref={ref => (this.mainList = ref)}
            getItemLayout={this.props.getItemLayout}
            onViewableItemsChanged={this.handleScroll}
            {...this.props}
          />
        </View>

        {/** Right Side Alphabet FlatList */}
        <View style={styles.alphabetListContainerStyle}>
          <FlatList
            ref={ref => (this.letterList = ref)}
            data={this.state.alphabetList}
            renderItem={this.renderAlphabetItem}
            extraData={this.state.selectedLetter}
            keyExtractor={this.alphabetKeyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    )
  }
}
