package mta.ltnc.BookStore.managers;

import mta.ltnc.BookStore.entity.Image;
import mta.ltnc.BookStore.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
* Generated by Spring Data Generator on 22/06/2019
*/
@Component
public class ImageManager {

	private ImageRepository imageRepository;

	@Autowired
	public ImageManager(ImageRepository imageRepository) {
		this.imageRepository = imageRepository;
	}

}