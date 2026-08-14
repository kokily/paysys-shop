type Props = {
  busy: boolean;
  onList: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPrint: () => void;
};

export default function WeddingButton({
  busy,
  onList,
  onEdit,
  onDelete,
  onPrint,
}: Props) {
  return (
    <div className="wedding-buttons no-print">
      <button type="button" onClick={onList} className="wb-btn menu">
        목록
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={onEdit}
        className="wb-btn edit"
      >
        수정
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={onDelete}
        className="wb-btn cancel"
      >
        삭제
      </button>
      <button
        type="button"
        onClick={onPrint}
        className="wb-btn print hidden md:inline-block"
      >
        인쇄
      </button>
    </div>
  );
}
