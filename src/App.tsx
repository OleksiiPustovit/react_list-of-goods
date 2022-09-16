import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  handleSortByAlphabet = () => {
    this.setState({
      sortType: SortType.ALPABET,
    });
  };

  handleSortByLength = () => {
    this.setState({
      sortType: SortType.LENGTH,
    });
  };

  handleReverse = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  handleReset = () => {
    this.setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  render() {
    const { isReversed, sortType } = this.state;

    const visibleGoods = getReorderedGoods(goodsFromServer, {
      isReversed,
      sortType,
    });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            onClick={this.handleSortByAlphabet}
            type="button"
            className={classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPABET },
            )}
          >
            Sort alphabetically
          </button>

          <button
            onClick={this.handleSortByLength}
            type="button"
            className={classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
          >
            Sort by length
          </button>

          <button
            onClick={this.handleReverse}
            type="button"
            className={classNames(
              'button',
              'is-warning',
              { 'is-light': isReversed !== true },
            )}
          >
            Reverse
          </button>

          {isReversed === false && sortType === SortType.NONE ? ''
            : (
              <button
                onClick={this.handleReset}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )}
        </div>

        <ul>
          <ul>
            {visibleGoods.map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
