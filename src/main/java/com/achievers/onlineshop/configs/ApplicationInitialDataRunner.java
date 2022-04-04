package com.achievers.onlineshop.configs;

import com.achievers.onlineshop.admin.model.Carousel;
import com.achievers.onlineshop.admin.model.Setting;
import com.achievers.onlineshop.admin.repository.CarouselRepository;
import com.achievers.onlineshop.admin.repository.SettingRepository;
import com.achievers.onlineshop.admin.service.CarouselService;
import com.achievers.onlineshop.security.model.ERole;
import com.achievers.onlineshop.security.model.Role;
import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.repository.RoleRepository;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ApplicationInitialDataRunner implements CommandLineRunner {
    protected final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private CarouselRepository carouselRepository;

    @Override
    public void run(String... args) throws Exception {

        if(roleRepository.getRoleByName("ROLE_USER") == null){
            roleRepository.save(new Role(ERole.ROLE_USER));
        }

        if(roleRepository.getRoleByName("ROLE_ADMIN") == null){
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        if(roleRepository.getRoleByName("ROLE_MODERATOR") == null){
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
        }

        User user = new User("manager","onlineshop.manager@gmail.com",passwordEncoder.encode("password"), "System Manager");
        Role adminRole = roleRepository.getRoleByName("ROLE_ADMIN");
        Set<Role> roles2 = new HashSet<>();
        roles2.add(adminRole);
        user.setRoles(roles2);

        if(!userRepository.existsByUsername("manager")){
            userRepository.save(user);
        }

        Setting setting = settingRepository.getParamValueByName("TaxValue");
        if(setting == null){
            Setting setting2 = new Setting("TaxValue", 7.5f);
            settingRepository.save(setting2);
        }

        carouselRepository.deleteAll();

        Carousel carousel1 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/3fcc5db4-6056-47e3-8aa4-5275e1526233.jpg");
        Carousel carousel2 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/ebf2a308-2bf1-4849-b125-17d7ef2a6b77.jpg");
        Carousel carousel3 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/1dc0fa99-d0e2-4665-b20d-3c8e0d1f4b95.jpg");
        Carousel carousel4 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/bb8e2098-4b24-4c2f-a7eb-3c9ddeabc0a6.jpg");
        Carousel carousel5 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/11398910-eda4-4dbe-8a65-de285ab3eee5.jpg");
        Carousel carousel6 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/6a8fa430-cfbc-4950-a6e8-82100b98820e.jpg");
        Carousel carousel7 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/f4fae789-237d-4e64-9a23-c942ec7ad099.jpg");
        Carousel carousel8 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/aeacdb03-16ba-4823-bc5d-6157d47d7af1.jpg");
        Carousel carousel9 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/8df4c21e-2f2f-48a6-85c9-bb5d65111002.jpg");
        Carousel carousel10 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/252aae5d-3f37-4146-992f-ac6635124877.jpg");
        Carousel carousel11 = new Carousel("https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/carousel/eaf7191e-b539-43cb-967b-a1c6bc108145.jpg");

        carouselRepository.save(carousel1 );
        carouselRepository.save(carousel2 );
        carouselRepository.save(carousel3 );
        carouselRepository.save(carousel4 );
        carouselRepository.save(carousel5 );
        carouselRepository.save(carousel6 );
        carouselRepository.save(carousel7 );
        carouselRepository.save(carousel8 );
        carouselRepository.save(carousel9 );
        carouselRepository.save(carousel10);
        carouselRepository.save(carousel11);


        logger.info("Application started!");
    }
}
