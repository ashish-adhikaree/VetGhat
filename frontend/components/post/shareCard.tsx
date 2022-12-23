import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { BiCopy } from "react-icons/bi";
import { Post } from "../../typedeclaration";

const ShareCard = ({ post }: { post: Post }) => {
  return (
   <div className="p-5 absolute bottom-0 w-full bg-gray-300 space-y-3">
    <p className="text-md text-center font-semibold">Share this Post..</p>
     <div className="flex items-center space-x-3 justify-center w-full">
      <FacebookShareButton
        url={"https://ashishadhikari33.com"}
        blankTarget={true}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <PinterestShareButton media="" url={"https://ashishadhikari33.com"} blankTarget={true}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={"https://ashishadhikari33.com"} blankTarget={true}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={"https://ashishadhikari33.com"} blankTarget={true}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={"https://ashishadhikari33.com"} blankTarget={true}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <BiCopy className=" text-gray-600 text-2xl" />
    </div>
   </div>
  );
};

export default ShareCard;
