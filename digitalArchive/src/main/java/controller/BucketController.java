package controller;

import model.Artifacts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import service.AmazonClient;
import service.ArtifactService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/storage/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class BucketController {

    @Autowired
    ArtifactService artifactService;

    private AmazonClient amazonClient;

    @Autowired
    BucketController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }
    // not used
    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonClient.uploadFile(file);
    }
    // not used
    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }
    /*
    * Upload file to bucket and add filepath to artifact
    */
    @PostMapping("/{artifactId}/uploadFile")
    public Map<String, String> uploadFileWithArtifact(@RequestPart(value = "File") MultipartFile file, @PathVariable("artifactId") Integer artifactId) {
        Artifacts artifact = artifactService.getArtifacts(artifactId);
        String url = this.amazonClient.uploadFile(file);
        artifact.setFilepath(url);
        artifactService.addArtifact(artifact);
        Map<String, String> map = new HashMap<>();
        map.put("url", url);
        return map;
    }
    /*
    * delete file to bucket and change filepath to artifact
    */
    @DeleteMapping("/{artifactId}/deleteFile")
    public String deleteFileWithArtifact(@PathVariable("artifactId") Integer artifactId) {
        Artifacts artifact = artifactService.getArtifacts(artifactId);
        String fileUrl = artifact.getFilepath();
        artifact.setFilepath(null);
        artifactService.addArtifact(artifact);
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }
    /*
    * Upload file to bucket and delete old one and add filepath to artifact
    */
    @PostMapping("/{artifactId}/editFile")
    public Map<String, String> editFileWithArtifact(@RequestPart(value = "File") MultipartFile file, @PathVariable("artifactId") Integer artifactId) {
        Artifacts artifact = artifactService.getArtifacts(artifactId);
        this.amazonClient.deleteFileFromS3Bucket(artifact.getFilepath());
        String url = this.amazonClient.uploadFile(file);
        artifact.setFilepath(url);
        artifactService.addArtifact(artifact);
        Map<String, String> map = new HashMap<>();
        map.put("url", url);
        return map;
    }
}