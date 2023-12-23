import { MantineProvider, Select } from '@mantine/core';
import { TiArrowSortedDown } from 'react-icons/ti';

type Props = {
  data: dataType[] | string[];
  value: string;
  onChange: (value: string) => void;
};

type dataType = {
  label: string;
  value: string;
};

export default function SelectComp({ data, value, onChange }: Props) {

  return (
    <MantineProvider
      theme={{
        primaryColor: 'orange',
      }}>
      <Select
        className="border w-max rounded-[20px] pl-4 font-medium max-w-[150px]"
        size="md"
        variant="unstyled"
        value={value}
        data={data}
        transitionProps={{
          transition: 'scale-y',
          duration: 300,
          timingFunction: 'ease',
        }}
        rightSection={<TiArrowSortedDown size="1rem" />}
        onChange={onChange}
      />
    </MantineProvider>
  );
}
