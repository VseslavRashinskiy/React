import React from 'react';

const Categories: React.FunctionComponent<{
  value: string;
  onClickCategory: (i: string) => void;
}> = ({ value, onClickCategory }) => {
  const categories = ['all', 'alive', 'dead', 'unknown'];
  return (
    <div className="categories">
      <ul className="categories-list">
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(categories[i])}
            className={value === categories[i] ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
