interface AddTransformationTypeProps {
  params: { type: string };
}

export default function AddTransformationType({
  params: { type },
}: AddTransformationTypeProps) {
  return <div>{type}</div>;
}
