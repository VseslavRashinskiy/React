import React from 'react';

const Categories: React.FunctionComponent<{
  onClickCategory: (i: string) => void;
}> = ({ onClickCategory }) => {
  const categories = ['all', 'alive', 'dead', 'unknown'];
  return (
    <div className="categories">
      <ul className="categories-list">
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(categories[i])}
            className={categories[i] ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
