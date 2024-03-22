import Image from "next/image";
import fetchFormData from '../../../../utils/frontend/formdata/fetchFormData';
import ImageUploadForm from './component/ImgeUploadFrom';
import JsonUploadForm from './component/JsonuploadFrom';

export default function Home() {
  return (
    <main>
      {/* <ImageUploadForm/> */}
      <JsonUploadForm/>
    </main>
  );
}
