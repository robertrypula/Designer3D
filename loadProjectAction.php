<?php

function readSavedProjectsDir()
{
    $files = array();

    // reads temp directory
    $dir_temp = __DIR__.'/_savedProjects';
    $dir_handle = opendir($dir_temp);
    if (!$dir_handle) return $files;

    while (false !== ($file = readdir($dir_handle))) {
        // if file is directory, .svn etc continue
        if ($file == '.' || $file == '..' || $file == 'index.php' || 
            $file == '.svn' || $file == 'thumbs' || $file == '.git')
            continue;

        // if match add to return array
        $files[] = $file;
    }
    closedir($dir_handle);

    return $files;
}



function loadProjectAction()
{
    $files = readSavedProjectsDir();
    
    if (count($files)==0)
        return '';
    
    $content = file_get_contents(__DIR__.'/_savedProjects/'.$files[count($files)-1]);
    
    return $content;
}

echo loadProjectAction();

?>
