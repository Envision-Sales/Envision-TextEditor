import React, { useCallback, useContext } from 'react';
import Select from '../../../ui/Select';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';

const defaultLineHeightOptions: FontOptions = [
  ['1', '1 lh'],
  ['2', '2 lh'],
  ['3', '3 lh'],
];

interface ILineHeightDropdown {
  lineHeightOptions?: FontOptions;
}

const LineHeightDropdown = ({
  lineHeightOptions = defaultLineHeightOptions,
}: ILineHeightDropdown) => {
  const { lineHeight, applyStyleText } = useContext(ToolbarContext);

  const onLineHeightSelect = useCallback(
    (e) => {
      applyStyleText({ 'line-height': e.target.value });
    },
    [applyStyleText]
  );

  return (
    <>
      <Select
        className="toolbar-item font-size"
        onChange={onLineHeightSelect}
        options={lineHeightOptions}
        value={lineHeight}
      />
      <i className="chevron-down inside" />
    </>
  );
};

export default LineHeightDropdown;
