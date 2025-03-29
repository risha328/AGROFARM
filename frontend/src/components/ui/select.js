import React from 'react';

export const Select = ({ children, ...props }) => (
  <select className="border p-2 rounded" {...props}>{children}</select>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

