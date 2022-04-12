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

        Carousel carousel1 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/f622bfb7-d1b5-4113-b125-742ca2ab4d7a.jpg");
        Carousel carousel2 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/3dfb4b3e-1319-4d9c-a31f-74002faa9722.jpg");
        Carousel carousel3 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/66b94ed7-ce73-4b78-ac2c-aaee022ba60d.jpg");
        Carousel carousel4 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/b2a9f80c-de8f-4bef-bb95-b5ef41ef201b.jpg");
        Carousel carousel5 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/9569d629-8d8f-4ab1-8f76-73fde2ccd92d.jpg");
        Carousel carousel6 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/f62801ea-baea-4836-b66a-05c6cdd446db.jpg");
        Carousel carousel7 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/41fa2e72-6467-4a02-a3c5-928f9ae3abbd.jpg");
        Carousel carousel8 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/6236601d-3495-421f-9e8e-c3e9070ada84.jpg");
        Carousel carousel9 = new Carousel("https://sw-eng-project-72867.s3.us-east-2.amazonaws.com/carousel/a65b650c-2c0c-467c-909d-07831710ac29.jpg");

        carouselRepository.save(carousel1 );
        carouselRepository.save(carousel2 );
        carouselRepository.save(carousel3 );
        carouselRepository.save(carousel4 );
        carouselRepository.save(carousel5 );
        carouselRepository.save(carousel6 );
        carouselRepository.save(carousel7 );
        carouselRepository.save(carousel8 );
        carouselRepository.save(carousel9 );


        logger.info("Application started!");
    }
}
