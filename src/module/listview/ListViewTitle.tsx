export interface ListViewTitleProps {
  title: string,
  emoji: string
}

const ListViewTitle = ({title, emoji}: ListViewTitleProps) => {

  return (
    <div id="mmm-notion-listview-titleContainer">
      <div id="mmm-notion-listview-emoji">{emoji}</div>
      <div id="mmm-notion-listview-title">{title}</div>
    </div>
  )
}

export default ListViewTitle
