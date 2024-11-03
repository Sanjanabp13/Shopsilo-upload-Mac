// import React from 'react';

// const SelectDropdownwithchild = ({ data, onSelect, title }) => {
//     const renderOptions = (categories, parentId = null, level = 0) => {
//         return categories
//             .filter(category => category.parentId === parentId)
//             .map(category => (
//                 <React.Fragment key={category.id}>
//                     <option value={category.id}>
//                         {"-".repeat(level) + " " + category.name}  {/* Indentation */}
//                     </option>
//                     {renderOptions(categories, category.id, level + 1)}
//                 </React.Fragment>
//             ));
//     };

//     return (
//         <select onChange={(e) => onSelect(e.target.value)} className="border rounded p-2">
//             <option value="">{title}</option>
//             {renderOptions(data)}
//         </select>
//     );
// };

// export default SelectDropdownwithchild;
// src/components/SelectDropdownWithChildren.js
import React from 'react';

const SelectDropdownwithchild = ({ data, onSelect, title, idField = 'categoryID', nameField = 'categoryName' }) => {
    const renderOptions = (items, level = 0) => {
        return items
            // .filter(item => item.parentId === parentId)
            .map(item => (
                <React.Fragment key={item[idField]}>
                    <option value={item[idField]}>
                        {"-".repeat(level) + " " + item[nameField]}
                    </option>
                    {items.child && renderOptions(items.child, level + 1)} {/* Recursively render children */}
                </React.Fragment>
            ));
    };

    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">{title}</option>
            {renderOptions(data)}
        </select>
    );
};

export default SelectDropdownwithchild;
