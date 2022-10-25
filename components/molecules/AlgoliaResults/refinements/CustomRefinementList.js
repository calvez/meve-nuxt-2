import cn from 'classnames'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {connectRefinementList} from 'react-instantsearch-dom'
import styles from '../AlgoliaResults.module.css'

/**
 * Render the RefinementList component.
 *
 * @author WebDevStudios
 * @see https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/
 * @param  {object}   props              The component attributes as props.
 * @param  {string}   props.attribute    The name of the attribute in the record.
 * @param  {string}   props.className    The component class.
 * @param  {any}      props.items        Any refinement.
 * @param  {number}   props.limit        The number of facet values to retrieve.
 * @param  {Function} props.refine       Modifies the items being displayed.
 * @param  {boolean}  props.showCount    Whether to display the count.
 * @param  {boolean}  props.showMore     Whether to display a button that expands the number of items.
 * @param  {string}   props.title        The component title.
 * @param  {object}   props.translations A mapping of keys to translation values.
 * @return {Element}                     The RefinementList component.
 */
function RefinementList({
  attribute,
  className,
  items,
  limit,
  refine,
  showCount,
  showMore,
  title,
  translations
}) {
  const [extended, setExtended] = useState(false)

  return (
    <>
      {!!items && items.length > 0 && (
        <section className={cn(styles.filterPanel, className)}>
          {title && <h3>{title}</h3>}
          <ul>
            {items.map(
              (item, index) =>
                (index < limit || extended) && (
                  <li key={`${item.label}-${index}-${item.isRefined}`}>
                    <input
                      type="checkbox"
                      id={`chk-${item.label}`}
                      name={attribute}
                      value={item.value.join(',')}
                      onChange={() => refine(item.value)}
                      checked={item.isRefined}
                    />
                    <label htmlFor={`chk-${item.label}`}>
                      {item.label} {showCount && <span>[{item.count}]</span>}
                    </label>
                  </li>
                )
            )}
          </ul>
          {showMore && limit < items.length && (
            <button
              type="button"
              onClick={() => {
                setExtended(!extended)
              }}
              className={styles.moreBtn}
            >
              {translations['showMore'](extended)}
            </button>
          )}
        </section>
      )}
    </>
  )
}

RefinementList.propTypes = {
  attribute: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.any.isRequired,
  limit: PropTypes.number,
  refine: PropTypes.func,
  showCount: PropTypes.bool,
  showMore: PropTypes.bool,
  title: PropTypes.string,
  translations: PropTypes.object
}

RefinementList.defaultProps = {
  showCount: true
}

const CustomRefinementList = connectRefinementList(RefinementList)
export default CustomRefinementList
