import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LEDDisplay({ pinValues }) {
  const red = pinValues?.pin40 === 1;
  const yellow = pinValues?.pin38 === 1;
  const green = pinValues?.pin36 === 1;

  return (
    <Card className="bg-[#161b22] border-[#30363d] dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          GPIO Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-5 justify-center">
          <LED color="green" isOn={green} />
          <LED color="yellow" isOn={yellow} />
          <LED color="red" isOn={red} />
        </div>
      </CardContent>
    </Card>
  );
}

const LED = ({ color, isOn }) => {
  const ledStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: isOn ? color : 'gray',
  };

  return <div style={ledStyle} />;
};
