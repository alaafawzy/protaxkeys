import Home from '@/components/Home'; // تأكد من المسار الصحيح للمكون

export default async function Page({ params }) {
  // في إصدارات Next.js الحديثة يجب عمل await للـ params
  const { locale } = await params;

  return (
    <>
      <Home params={params}/>
    </>
  );
}