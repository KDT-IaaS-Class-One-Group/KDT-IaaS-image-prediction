import Image from "next/image";
import fetchFormData from '../../../../utils/frontend/formdata/fetchFormData';
import ImageUploadForm from './component/ImgeUploadFrom';

export default function Home() {
  return (
    <main>
      <ImageUploadForm/>
    </main>
  );
}
