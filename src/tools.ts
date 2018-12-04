import * as React from "react";
import * as moment from 'moment';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import FileIcon from 'mdi-material-ui/File';
import FileImageIcon from 'mdi-material-ui/FileImage';
import FileMusicIcon from 'mdi-material-ui/FileMusic';
import FilePdfIcon from 'mdi-material-ui/FilePdf';
import FileVideoIcon from 'mdi-material-ui/FileVideo';
import FilePowerpointIcon from 'mdi-material-ui/FilePowerpoint';
import FileWordIcon from 'mdi-material-ui/FileWord';
import FileExcelIcon from 'mdi-material-ui/FileExcel';
import FileXmlIcon from 'mdi-material-ui/FileXml';
import FileDelimitedIcon from 'mdi-material-ui/FileDelimited';
import FileDocumentIcon from 'mdi-material-ui/FileDocument';

const fileExtByType = new Map<string, string[]>([
  ['image'     , ['ai','dxf','odg','fodg','svg','svgz','bmp','gif','ico','jpg','jpeg','png','psd','pdd','tga','tiff','xcf','xpm']],
  ['audio'     , ['au','aif','aifc','aiff','wav','flac','la','pac','m4a','ape','wv','wma','ast','mp2','mp3','spx','aac','mpc','ra','ogg','mid','m3u','pls']],
  ['pdf'       , ['pdf','ps']],
  ['video'     , ['webm','mkv','flv','vob','ogv','drc','avi','mov','qt','wmv','rm','rmvb','asf','mp4','m4p','m4v','mpg','mpeg','mpe','mpv','3gp','3g2','mxf','aff','m2ts','mts']],
  ['powerpoint', ['ppt','pot','pps','pptx','pptm','potx','potm','ppam','ppsx','ppsm','sldx','sldm','odp','fodp','otp']],
  ['word'      , ['doc','dot','docx','docm','dotx','dotm','docb','odt','fodt','ott']],
  ['excel'     , ['xls','xlt','xlm','xlsx','xlsm','xltx','xltm','xla','xlam','ods','fods','ots']],
  ['xml'       , ['xml','xslt','html','xhtml','htm']],
  ['delimited' , ['csv']],
  ['document'  , ['txt','rtf','c','h','cpp','hpp','cxx','hxx','java','js','rb','py','cs','m','sh','php','css','go']]
]);
const typeByFileExt = new Map<string, string>();
const iconByFileExt = new Map<string, React.ComponentType<SvgIconProps>>();

for (let [kind, exts] of fileExtByType.entries()) {
  for (let ext of exts) {
    typeByFileExt.set(ext, kind);
    switch (kind) {
      case 'image':
        iconByFileExt.set(kind, FileImageIcon);
        break;
      case 'audio':
        iconByFileExt.set(kind, FileMusicIcon);
        break;
      case 'pdf':
        iconByFileExt.set(kind, FilePdfIcon);
        break;
      case 'video':
        iconByFileExt.set(kind, FileVideoIcon);
        break;
      case 'powerpoint':
        iconByFileExt.set(kind, FilePowerpointIcon);
        break;
      case 'word':
        iconByFileExt.set(kind, FileWordIcon);
        break;
      case 'excel':
        iconByFileExt.set(kind, FileExcelIcon);
        break;
      case 'xml':
        iconByFileExt.set(kind, FileXmlIcon);
        break;
      case 'delimited':
        iconByFileExt.set(kind, FileDelimitedIcon);
        break;
      case 'document':
        iconByFileExt.set(kind, FileDocumentIcon);
        break;
    }
  }
}

export function getDirectory(filepath: string) {
  return filepath.substr(0, filepath.lastIndexOf('/'));
}

export function getFilename(filepath: string) {
  return filepath.substr(filepath.lastIndexOf('/') + 1);
}

export function getFileBasename(filepath: string) {
  const filename = getFilename(filepath);
  const i = filename.lastIndexOf('.');
  return i > 0 ? filename.substr(0, i) : filename;
}

export function getFileExtension(filepath: string) {
  const filename = getFilename(filepath);
  const i = filename.lastIndexOf('.');
  return i > 0 ? filename.substr(i + 1).toLowerCase() : '';
}

export function getFileType(filepath: string) {
  const t = typeByFileExt.get(getFileExtension(filepath));
  return t !== undefined ? t : '';
}

export function getFileIcon(filepath: string) {
  const icon = iconByFileExt.get(getFileExtension(filepath));
  return icon !== undefined ? icon : FileIcon;
}

export function getPrettySize(size: number) {
  if (size > 1024 * 1024 * 1024) {
    return (size / (1024 * 1024 * 1024)).toFixed(1);
  } else if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(1);
  } else if (size > 1024) {
    return (size / 1024).toFixed(1);
  } else {
    return size;
  }
}

export function getPrettySizeUnit(size: number) {
  if (size > 1024 * 1024 * 1024) {
    return "G";
  } else if (size > 1024 * 1024) {
    return "M";
  } else if (size > 1024) {
    return "K";
  } else {
    return "";
  }
}

export function getPrettyDuration(duration: number) {
  const d = moment.duration(duration);
  const hours = d.hours();
  let text = "";
  if (hours > 0) {
    text += hours + ':';
  }
  var minutes = d.minutes();
  if (minutes < 10 && text.length > 0) {
    text += '0';
  }
  text += minutes + ':';
  var seconds = d.seconds();
  if (seconds < 10) {
    text += '0';
  }
  text += seconds;
  return text;
}

export function filterFileName(fileName: string) {
  let result = "";
  for (let c of fileName) {
    switch (c) {
      case '<':
      case '>':
      case ':':
      case '"':
      case '/':
      case '\\':
      case '|':
      case '?':
      case '*':
        break;
      default:
        return result += c;
    }
  }
  return result;
}
