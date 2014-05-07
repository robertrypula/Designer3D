<?php




function saveProjectAction()
{
    $sceneJson = $_POST['sceneJson'];
    
    $fileName = md5(rand(0, 99999));
    $filePath = __DIR__ . '/_savedProjects/' . date('Y-m-d_H-i-s') . '_' . $fileName . '.txt';
    $handle = fopen($filePath, 'w');
    fwrite($handle, $sceneJson);
    fclose($handle);
    
    return $sceneJson;
}

echo saveProjectAction();

?>
