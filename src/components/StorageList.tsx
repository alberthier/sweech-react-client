import * as React from "react";
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ServerIcon from 'mdi-material-ui/Server';
import CellphoneIcon from 'mdi-material-ui/Cellphone';
import SdIcon from 'mdi-material-ui/Sd';
import BookmarkIcon from 'mdi-material-ui/Bookmark';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, RouteComponentProps } from 'react-router-dom';
import PaperList from './PaperList';
import { Info } from "../apitypes";
import i18n from '../i18n';

type StorageListItemProps = {
  icon: React.ReactElement<SvgIconProps>,
  target: string,
}

const StorageListItem: React.FC<StorageListItemProps> = (props) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={props.target}>
      <ListItem button>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.children}</ListItemText>
      </ListItem>
    </Link>
  );
}

function createStorageLink(exists: boolean, icon: React.ReactElement<SvgIconProps>, target: string, text: string) {
  return exists && <StorageListItem key={target} icon={icon} target={'/fs' + target}>{text}</StorageListItem>
}

interface StorageListProps extends RouteComponentProps {
  info: Info
}

const StorageList: React.FC<StorageListProps> = (props) => {
  console.log(props);
  const externals = props.info.storagePaths.externals;
  const shortcuts = props.info.directories
  return (
    <PaperList>
      { createStorageLink(true, <CellphoneIcon/>, props.info.storagePaths.internal.path, i18n.internal) }
      { createStorageLink(true, <ServerIcon/>, '/', i18n.root) }
      { externals.map((item, index) => createStorageLink(true, <SdIcon/>, item.path, item.name)) }
      { createStorageLink(shortcuts.camera.exists, <BookmarkIcon/>, shortcuts.camera.path, i18n.camera) }
      { createStorageLink(shortcuts.documents.exists, <BookmarkIcon/>, shortcuts.documents.path, i18n.documents) }
      { createStorageLink(shortcuts.downloads.exists, <BookmarkIcon/>, shortcuts.downloads.path, i18n.downloads) }
      { createStorageLink(shortcuts.movies.exists, <BookmarkIcon/>, shortcuts.movies.path, i18n.movies) }
      { createStorageLink(shortcuts.music.exists, <BookmarkIcon/>, shortcuts.music.path, i18n.music) }
      { createStorageLink(shortcuts.pictures.exists, <BookmarkIcon/>, shortcuts.pictures.path, i18n.pictures) }
      { createStorageLink(shortcuts.ringtones.exists, <BookmarkIcon/>, shortcuts.ringtones.path, i18n.ringtones) }
    </PaperList>
  )
}

export default StorageList;