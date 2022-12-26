import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { Comment as CommentType } from "../../typedeclaration";
import Comment from "./comment";

const CommentCard = ({
  comments,
  showCommentCard,
}: {
  comments: CommentType[];
  showCommentCard: any;
}) => {
  const router = useRouter()
  return (
    <div className="h-full w-full absolute overflow-y-scroll scrollbar-none top-0 bottom-0 left-0 right-0 bg-white z-[100]">
      <div id="comment-card-header" className="w-full border-b text-center p-3 font-semibold flex items-center">
        <BiArrowBack
          className="text-xl cursor-pointer"
          onClick={() => {
            showCommentCard(false);
          }}
        />
        <p className="flex-grow">Comments</p>
      </div>
      {comments.map((cmnt, index) => (
        <Comment key={index} cmnt={cmnt} />
      ))}
    </div>
  );
};
export default CommentCard;
