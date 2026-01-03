//About Video;
import Card from "@/components/card";

export default function AboutVideo(){
    return  <Card className="">
          <div className='flex justify-between item-center'>
            <p className="font-medium text-4 my-4">
              About us  <span className="text-xs text-primary italic block">* Growth plan *</span>
            </p>
         <div>
            <button className='peer'>Upload</button>
            <input
              type="file"
              className="sr-only"
              />
              </div>
              </div>
             
            <p>
              Include a short 90 seconds video to your store profile, showcase
              how your product works to your customer
            </p>
          </Card>


}