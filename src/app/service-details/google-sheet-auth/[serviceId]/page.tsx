export default function Page({ params }: { params: { serviceId: string } }) {
  return <div>My ServiceId: {params.serviceId}</div>;
}
