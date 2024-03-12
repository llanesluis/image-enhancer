import Header from "@/components/shared/Header";
import {
  TransformationType,
  transformationsTypes,
} from "@/constants/transformations";

interface AddTransformationTypeProps {
  params: {
    type: TransformationType;
  };
}

export default function AddTransformationType({
  params: { type },
}: AddTransformationTypeProps) {
  const { title, subtitle, icon } = transformationsTypes[type];
  return (
    <main className="container py-16">
      <Header title={title} subtitle={subtitle} />
    </main>
  );
}
